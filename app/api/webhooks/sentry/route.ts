import { NextResponse } from 'next/server';
import { Octokit } from 'octokit';

const octokit = new Octokit({
    auth: process.env.PAT_TOKEN, // GitHub Personal Access Token
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Sentry sends an 'event' or 'issue' payload depending on the integration type
        // We assume 'Issue Alert' or 'Error' payload
        const error_message = body.data?.issue?.title || body.message || 'Unknown Error';
        const stack_trace = body.data?.error?.stacktrace?.frames
            ?.map((f: any) => `${f.filename}:${f.lineno} - ${f.function}`)
            .join('\n') || 'No stack trace available';

        // Attempt to extract the primary file path
        const file_path = body.data?.error?.stacktrace?.frames?.slice(-1)[0]?.filename || '';

        if (!file_path) {
            console.warn('No file path found in Sentry payload');
            return NextResponse.json({ message: 'No file path found, skipping fix' }, { status: 200 });
        }

        // Map Sentry absolute path to relative repo path if necessary
        // (Sentry often uses full paths or app:/// prefix)
        const relative_path = file_path.replace('app:///', '').split('?')[0];

        console.log(`Triggering auto-fix for: ${relative_path}`);

        // Trigger GitHub Action
        await octokit.request('POST /repos/{owner}/{repo}/dispatches', {
            owner: process.env.GITHUB_OWNER || '',
            repo: process.env.GITHUB_REPO || '',
            event_type: 'auto-fix',
            client_payload: {
                error_message,
                stack_trace,
                file_path: relative_path,
            },
        });

        return NextResponse.json({ message: 'Auto-fix triggered' }, { status: 202 });
    } catch (error: any) {
        console.error('Error in Sentry Webhook Bridge:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
