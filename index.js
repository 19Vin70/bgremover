import fs from 'fs/promises';
import fetch from 'node-fetch';
import FormData from 'form-data';

async function removeBg(fileBuffer) {
  const formData = new FormData();
  formData.append("size", "auto");
  formData.append("image_file", fileBuffer, {
    filename: "image.png",
    contentType: "image/png",
  });

  const response = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: { "X-Api-Key": "b7tm3ofRJozhZwThv4mFNAYU" }, 
    body: formData,
  });

  if (response.ok) {
    return await response.arrayBuffer(); 
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
}

async function processImage() {
  const inputPath = "./uploads/bee.png";

  try {
    const fileBuffer = await fs.readFile(inputPath);

    const rbgResultData = await removeBg(fileBuffer);

    await fs.writeFile("./no-bg/nobg.png", Buffer.from(rbgResultData));

  } catch (error) {
    console.error("Error:", error);
  }
}

processImage();