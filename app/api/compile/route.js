export async function POST(request) {
    try {
        const body = await request.json();

        const response = await fetch(
            "http://educode-alb-public-23525038.ap-south-1.elb.amazonaws.com/student/compile-external",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }
        );

        const data = await response.json();
        return Response.json(data);
    } catch (error) {
        return Response.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}
