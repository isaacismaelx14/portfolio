import type { NextApiRequest, NextApiResponse } from 'next';
import Me from '../../data/me.json';
type Data = typeof Me.projects;

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    res.status(200).json(Me.projects);
}
