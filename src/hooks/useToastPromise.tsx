
import toast from "react-hot-toast";
import { TData, TResponse } from "../types/global.type";


type TToastPromise = (
  promise: (arg: Record<string, unknown>) => Promise<
    TResponse<Record<string, unknown>[]> | unknown
  > & {
    unwrap(): Promise<any>;
  },
  payload: Record<string, unknown> | FormData | string,
  loadingMessage?: string,
  successMessage?: string,
  errorMessage?: string
) => Promise<TResponse<Record<string, unknown>[]> | unknown>;

export const useToastPromise = () => {
  const toastPromise: TToastPromise = async (
    promise,
    payload,
    loadingMessage,
    successMessage,
    errorMessage
  ) => {
    const loading = toast.loading(loadingMessage || "Loading...");
    try {
      const res = (await promise(
        payload as Record<string, unknown>
      ).unwrap()) as TData<Record<string, unknown>>;

      toast.success(successMessage || res?.message || "Success", {
        id: loading,
      });

      return res ;
    } catch (error: any) {
      toast.error(
        errorMessage || error?.data?.message || "Something went wrong.",
        {
          id: loading,
        }
      );
      return error as TData<Record<string, unknown>>;
    }
  };
  return { toastPromise };
};
