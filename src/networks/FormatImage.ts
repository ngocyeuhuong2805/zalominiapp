// export async function imageFormats(url, request) {  
//     try {
//         const image = new FormData();
//         const response = await fetch(url);

//         if (!response.ok) {
//             throw new Error(`Failed to fetch image from ${url}`);
//         }

//         console.log("🚀 ~ callApiLogo ~ currentLogo:", url);
//         const blob = await response.blob();
//         console.log("🚀 ~ callApiLogo ~ blob:", blob);

//         const randomNumber = Math.floor(Math.random() * 1000); // Random number between 0 and 999
//         const filename = `logo_${randomNumber}.png`;

//         image.append(request, blob, filename);
//         return image;
//     } catch (error) {
//         console.error("Error fetching or processing image:", error);
//         throw error;
//     }
// }
export async function fetchImageBlobs(imageUrls, fieldNames) {
  try {
    const formData = new FormData();

    for (let i = 0; i < imageUrls.length; i++) {
      const url = imageUrls[i];
      const fieldName = fieldNames[i];

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch image from ${url}`);
      }

      const blob = await response.blob();
      const randomNumber = Math.floor(Math.random() * 1000);
      const filename = `${fieldName}_${randomNumber}.png`;

      formData.append(fieldName, blob, filename);
    }

    return formData;
  } catch (error) {
    console.error("Error fetching or processing images:", error);
    throw error;
  }

}

export async function fetchAllImageBlobs(imageUrls, fieldNames) {
  try {
    const formData = new FormData();

    // Tạo danh sách các Promise để fetch hình ảnh đồng thời
    const fetchPromises = imageUrls.map((url, index) => {
      const fieldName = fieldNames[index];
      return fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch image from ${url}`);
          }
          return response.blob().then(blob => ({ fieldName, blob }));
        });
    });

    // Chờ tất cả các Promise hoàn thành
    const results = await Promise.all(fetchPromises);

    // Thêm các Blob vào FormData
    results.forEach(({ fieldName, blob }) => {
      const randomNumber = Math.floor(Math.random() * 1000);
      const filename = `${fieldName}_${randomNumber}.png`;
      formData.append(fieldName, blob, filename);
    });

    return formData;
  } catch (error) {
    console.error("Error fetching or processing images:", error);
    throw error;
  }
}



// export async function fetchImageBlobs(imageInfoList) {
//     try {
//         const formData = new FormData();

//         for (const imageInfo of imageInfoList) {
//             const { url, fieldName, title } = imageInfo; // Destructure the image info

//             const response = await fetch(url);

//             if (!response.ok) {
//                 throw new Error(`Failed to fetch image from ${url}`);
//             }

//             const blob = await response.blob();
//             const randomNumber = Math.floor(Math.random() * 1000);
//             const filename = `${fieldName}_${randomNumber}.png`;

//             // Append the blob to the form data with the field name and filename
//             formData.append(fieldName, blob, filename);

//             // Optionally, you can also append the title as another field if needed
//             // formData.append(`${fieldName}_title`, title);
//         }

//         return formData;
//     } catch (error) {
//         console.error("Error fetching or processing images:", error);
//         throw error;
//     }
// }>>>>>>> .r348

export async function appendImageToFormDataIfBlob(formData, blobString, nameString) {
  if (blobString.includes("blob:")) {
    try {
      const response = await fetch(blobString);
      if (!response.ok) {
        console.log(`Failed to fetch image from ${blobString}`);
      }
      const blob = await response.blob();
      const randomNumber = Math.floor(Math.random() * 1000);
      const filename = `${nameString.trim().replace(" ", "")}_${randomNumber}.png`;
      formData.append(nameString, blob, filename);
      console.log(blob)
      return true;
    } catch (e) {
      console.log(`Error fetching ${nameString}`);
      return false;
    }
  }

  // Default return value if the condition is not met
  return false;
}
