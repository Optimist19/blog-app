// export async function getBlogs(cookie?: string) {
//   const res = await fetch("http://localhost:3000/api/blogs", {
//     headers: {
//       Cookie: cookie ?? "" 
//     }
//   });

//   if (!res.ok) throw new Error("Failed to fetch blogs");
//   return res.json();
// }