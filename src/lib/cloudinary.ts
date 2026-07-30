const CLOUD_NAME = "identity"
const UPLOAD_PRESET = "identity"

export async function uploadToCloudinary(file: File, resourceType: "image" | "video" = "image") {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", UPLOAD_PRESET)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`, {
    method: "POST",
    body: formData,
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(err)
  }

  const data = await res.json()
  return data.secure_url as string
}
