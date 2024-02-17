import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { uploadFile } from "../redux/AdnanAddFile.js";

const useImageLiveLogic = (defaultImages = []) => {
  const [responseImages, setResponseImages] = useState([]);
  const [keptImages, setKeptImages] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (defaultImages) {
      setKeptImages(
        defaultImages.map((image) => {
          const imageParts = image.split("/");
          return imageParts[imageParts.length - 1];
        })
      );
      setImages(defaultImages);
    }
    // console.log("defaultImages", defaultImages);
  }, []);

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file.file);

    setLoading(true);
    const res = await dispatch(uploadFile(formData));
    setLoading(false);
    return res.payload?.data[0];
  };

  const onStoreImage = async (files, indices) => {
    const tmpStoredFiles = await processUploadingFiles(files, indices);
    const tmpKeptImages = [...keptImages];
    indices.map((i) => {
      tmpKeptImages[i] = null;
    });
    setKeptImages(tmpKeptImages);
    setResponseImages([...responseImages, ...tmpStoredFiles]);
  };

  const processUploadingFiles = async (files, indices) => {
    const uploadedFiles = [];

    await Promise.all(
      indices.map(async (index) => {
        const storedFile = await handleFileUpload(files[index]);
        uploadedFiles.push(storedFile);
      })
    );

    return uploadedFiles;
  };

  const onUpdateImage = async (files, indices) => {
    const uploadedFiles = await processUploadingFiles(files, indices);
    const tmpResponseImages = [...responseImages];
    const tmpKeptImages = [...keptImages];

    uploadedFiles.map((responseImage, index) => {
      tmpResponseImages[indices[index]] = responseImage;
    });

    indices.map((i) => {
      tmpKeptImages.splice(i, 1);
    });
    setKeptImages(tmpKeptImages);
    setResponseImages(tmpResponseImages);
  };

  const handleDelete = (imageList) => {
    const tmpResponseImages = [...responseImages];
    const tmpKeptImages = [...keptImages];

    images.map((image) => {
      const tmpIndex = imageList.indexOf(image);

      if (tmpIndex === -1) {
        tmpResponseImages.splice(tmpIndex, 1);
        tmpKeptImages.splice(tmpIndex, 1);
      }
    });

    setResponseImages(tmpResponseImages);
    setKeptImages(tmpKeptImages);
    setImages(imageList);
  };
  const onChange = async (imagesList, indices) => {
    if (indices === undefined) {
      handleDelete(imagesList);
    } else {
      const inStore = responseImages[indices[0]] === undefined;

      setImages(imagesList);

      if (inStore) {
        await onStoreImage(imagesList, indices);
      } else {
        await onUpdateImage(imagesList, indices);
      }
    }
  };

  return {
    onStoreImage,
    onUpdateImage,
    onChange,
    responseImages,
    setResponseImages,
    keptImages,
    setKeptImages,
    images,
    loading,
  };
};

export default useImageLiveLogic;
