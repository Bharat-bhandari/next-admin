import connectDB from "@/config/database";

export const GET = async (request) => {
  try {
    await connectDB();

    return new Response(JSON.stringify("Hello world"), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something Went Wrong", {
      status: 500,
    });
  }
};
