import React, {
  useCallback,
  useEffect,
  useRef,
  ChangeEvent,
  useState,
} from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { BsChevronDown } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addProduct, editProduct } from "../redux/feature/ProductsSlice";
import base64ToImageFile from "../utils/base64ToImageFile";
import { editCart } from "../redux/feature/cartSlice";

type Inputs = {
  title: string;
  desc: string;
  category: string;
  price: number;
  image: FileList;
};

interface ModalProductProps {
  setModal: (isOpen: boolean) => void;
  item?: {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
  };
}

const ModalProduct: React.FC<ModalProductProps> = ({ setModal, item }) => {
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useDispatch();

  const handelClose = useCallback(() => {
    setModal(false);
  }, [setModal]);

  const submitRef = useRef<HTMLButtonElement | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    (data) => {
      if (!item) {
        const reader = new FileReader();
        reader.readAsDataURL(data.image[0]);
        reader.onloadend = () => {
          const body = {
            id: uuidv4(),
            title: data.title,
            description: data.desc,
            price: Number(data.price),
            category: data.category,
            image: reader.result as string,
          };
          dispatch(addProduct(body));
          handelClose();
        };
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(data.image[0]);
        reader.onloadend = () => {
          const body = {
            id: item.id,
            title: data.title,
            description: data.desc,
            price: Number(data.price),
            category: data.category,
            image: reader.result as string,
          };
          dispatch(editProduct(body));
          dispatch(editCart({ ...body, amount: 0 }));
          handelClose();
        };
      }
    },
    [item, dispatch, handelClose]
  );

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files?.[0];

    if (files) {
      if (fileInputRef.current) {
        fileInputRef.current.files = e.target.files!;
        setValue("image", fileInputRef.current.files);
      }
      setPhotoPreview(URL.createObjectURL(files));
    }
  };

  useEffect(() => {
    if (item) {
      const imageFile = base64ToImageFile(item.image, `${item.title}.jpg`);
      const fileList = new DataTransfer();
      fileList.items.add(imageFile);
      setValue("title", item.title);
      setValue("desc", item.description);
      setValue("category", item.category);
      setValue("price", Number(item.price));
      setPhotoPreview(item.image);

      if (fileInputRef.current) {
        fileInputRef.current.files = fileList.files;
        setValue("image", fileInputRef.current.files);
      }
    }
  }, [item, setValue, onSubmit, getValues]);

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Create Product</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => handelClose()}
              >
                <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mb-4 w-full sm:w-[500px]"
              >
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Title
                  </label>
                  <input
                    {...register("title", { required: true })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="title"
                    type="text"
                    placeholder="Title"
                  />
                  {errors.title ? (
                    <p className="text-red-500 my-2 text-xs italic">
                      Please choose a title.
                    </p>
                  ) : null}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Description
                  </label>
                  <input
                    {...register("desc")}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="desc"
                    type="text"
                    placeholder="Description"
                  />
                </div>

                <div className="inline-block relative w-full mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Category
                  </label>
                  <select
                    {...register("category")}
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="men's clothing">men's clothing</option>
                    <option value="women's clothing">women's clothing</option>
                  </select>
                  <div className="pointer-events-none absolute top-10 right-0 flex items-center px-2 text-gray-700">
                    <BsChevronDown />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Price
                  </label>
                  <input
                    {...register("price", { required: true, min: 1 })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="price"
                    placeholder="$ Price"
                    type="number"
                    step="0.01"
                  />
                  {errors.price ? (
                    <p className="text-red-500 my-2 text-xs italic">
                      Price must be greater than $1
                    </p>
                  ) : null}
                </div>

                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Image
                </label>
                <input
                  {...register("image", {
                    required: true,
                    validate: {
                      lessThan10MB: (files) =>
                        files[0]?.size < 300000 || "Max 300kb",
                    },
                    onChange: handleUpload,
                  })}
                  accept="image/png, image/jpeg"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="file"
                  id="image"
                  ref={fileInputRef}
                />
                <p className="mt-1 text-sm text-primary">
                  PNG, JPG (MAX. 300kb).
                </p>
                {errors.image ? (
                  <p className="text-red-500 my-2 text-xs italic">
                    Please choose a correct Image.
                  </p>
                ) : null}
                <button ref={submitRef} type="submit" hidden />
              </form>
              <div className="flex justify-center items-center">
                {photoPreview ? (
                  <div className="max-w-[80px]">
                    <img alt="preview" className="w-full" src={photoPreview} />
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => handelClose()}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  if (submitRef.current) {
                    submitRef.current.click();
                  }
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ModalProduct;
