import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { editSettings as editSettingApi } from "../../services/apiSettings";

export function useEditSetting() {
  const queryClient = useQueryClient();

  const { mutate: editSetting, isLoading: isUpdating } = useMutation({
    mutationFn: editSettingApi,
    onSuccess: () => {
      toast.success("Setting successfully updated");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isUpdating, editSetting };
}
