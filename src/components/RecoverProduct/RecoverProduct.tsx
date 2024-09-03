
import { useNavigate } from "react-router-dom";
import { useUpdateProductMutation } from "../../redux/features/product/productApi";
import updateProductFunc from "../../utils/updateProductFunc";
import { Button } from "../ui/button";

type RecoverProductProps = {
  _id:string
};

const RecoverProduct = ({_id}:RecoverProductProps) => {
    const navigate = useNavigate()
    const [updateProduct] = useUpdateProductMutation()

    const handleRecover = async()=>{
     const res = await updateProductFunc({ _id, updateProduct });
     if(res){
        navigate("/dashboard/deleted-products");
     }
    }


  return (
    <Button type="button" onClick={handleRecover} variant="outline">
      Recover
    </Button>
  );
};

export default RecoverProduct;