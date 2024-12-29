export const ImageOperations = ({ setImage, handleImageUpload, images }) => {
  return (
    <>
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="block mb-4"
        />
        <button
          onClick={handleImageUpload}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Upload Image
        </button>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {images.map((img) => (
            <div key={img.id} className="overflow-hidden rounded shadow">
              <img
                src={img.url}
                alt={img.name}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
