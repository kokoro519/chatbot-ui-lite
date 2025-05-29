import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { prompt, sessionId } = req.body;

  const hook = process.env.NEXT_PUBLIC_MAKE_WEBHOOK!;
  console.log('→ Hitting Make:', hook);          // debug line

console.log('→ proxying to Make:', hook);

  const makeRes = await fetch(hook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: prompt, user_id: sessionId })
  });

  if (!makeRes.ok) {
    return res.status(500).json({ error: 'Make request failed' });
  }

  const { answer } = await makeRes.json();
  res.status(200).json({ answer });
}