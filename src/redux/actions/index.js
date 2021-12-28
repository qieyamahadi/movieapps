import { IS_OVERLAY_LOADING } from "../types";

export const setOverLayLoading = (isLoading) => ({
    type: IS_OVERLAY_LOADING,
    payload: isLoading,
})