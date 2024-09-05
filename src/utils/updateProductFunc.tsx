import toast from "react-hot-toast";
import { TProduct } from "../pages/Inventory/Inventory";

type updateProductFuncProps = {
  _id: string;
  data?: Partial<TProduct> | any;
  isUpdating?: boolean;
  updateProduct: (arg: { _id: string; productData: TProduct }) => Promise<any>;
};
const updateProductFunc = async ({
  _id,
  data,
  isUpdating,
  updateProduct,
}: updateProductFuncProps): Promise<boolean> => {
  let success = false;
  let productData = data || {};

  if (!data) {
    productData = { isDeleted: false };
  }

  try {
    await toast.promise(updateProduct({ _id, productData }), {
      loading: isUpdating ? "Updating..." : "Recovering...",
      success: (res: any) => {
        if (res?.error) {
          throw new Error(res.error.message);
        } else {
          success = true;
          return (
            <p>
              {isUpdating
                ? res.data.message
                : "Product recovered successfully!"}
            </p>
          );
        }
      },
      error: (err) => <b>{err.message || "Could not update!"}</b>,
    });
  } catch (error) {
    success = false;
  }

  return success;
};

export default updateProductFunc;
