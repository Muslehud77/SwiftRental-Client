import toast from "react-hot-toast";
import { useDeleteProductMutation } from "../../redux/features/product/productApi";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { PiTrashSimple } from "react-icons/pi";

type DeleteProductProps = {
  id:string;
  isIcon?:boolean
};

const DeleteProduct = ({id,isIcon}:DeleteProductProps) => {
  const [deleteProduct] = useDeleteProductMutation();

  const navigate = useNavigate()

    const deleteProductHandler = async () => {
      

      const handleDelete = async () => {
        toast.promise(deleteProduct(id), {
          loading: "Deleting the product...",
          success: (res: any) => {
            if (res?.error) {
              throw new Error(res.error.message);
            }
            navigate("/dashboard/deleted-products");
            return <p>Successfully deleted ⚠️</p>;
          },
          error: (err)=> <b>{err.message || "Could not delete!"}</b>,
        });
        
      };

      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Are you sure?
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Do you really want to delete this product?
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col border-l border-gray-200">
            <Button
              onClick={() => {
                handleDelete();
                toast.dismiss(t.id);
              }}
              variant="destructive"
              className="w-full rounded-none"
            >
              Delete
            </Button>
            <Button
              onClick={() => toast.dismiss(t.id)}
              variant="ghost"
              className="w-full rounded-none"
            >
              Cancel
            </Button>
          </div>
        </div>
      ));
    };


  return (
    <Button
      type="button"
      size={isIcon? "sm" : "default"}
      variant="destructive"
      onClick={() => deleteProductHandler()}
    >
      {isIcon ? <PiTrashSimple size={18} /> : " Delete Product"}
    
    </Button>
  );
};

export default DeleteProduct;