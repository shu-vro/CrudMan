// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
    let response = await fetch(
        "https://jsonplaceholder.typicode.com/comments?postId=1"
    );
    res.status(200).json({
        ...Object.fromEntries(response.headers.entries()),
    });
}
