export const uploadImage = async (capturedImage: any): Promise<any> => {
  const cloud_name = "re-cruit";
  const apiUrl = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;
  const upload_preset = "yi39nooz";

  const source = capturedImage.base64;
  if (source) {
    let base64Img = `data:image/jpg;base64,${source}`;
    let data = {
      file: base64Img,
      upload_preset,
    };

    const response = await fetch(apiUrl, {
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    })
      .then(async (response) => {
        let data = await response.json();
        if (data.secure_url) {
          alert("Upload successful");
          return data;
        }
      })
      .catch((err) => {
        alert("Cannot upload");
        return null;
      });
    return response;
  }
  return null;
};

export const getResult = (data: any) => {
  console.log({ data });
  const list = [
    {
      name: "Two & Half",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
      subtitle: "10%",
    },
    {
      name: "Three & Half",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
      subtitle: "20%",
    },
    {
      name: "Four & Half",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
      subtitle: "15%",
    },
    {
      name: "Five & Half",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
      subtitle: "10%",
    },
    {
      name: "Six & Half",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
      subtitle: "30%",
    },
    {
      name: "Seven & Half",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
      subtitle: "35%",
    },
  ];
  return list;
};
