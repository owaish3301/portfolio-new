import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../../keystatic.config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Filesystem editing is development-only. A deployed editor must authenticate with GitHub.
const disabled = process.env.NODE_ENV === 'production' && config.storage.kind === 'local';
const handlers = disabled ? null : makeRouteHandler({ config });
const unavailable = async () => new Response('Not found', { status: 404 });

export const GET = handlers?.GET ?? unavailable;
export const POST = handlers?.POST ?? unavailable;
