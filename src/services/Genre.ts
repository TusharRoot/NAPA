import { SOCIAL_ART_API_URL } from "../constants/url";
import { GetTokenResponse } from "@/types/tokens";
import axios, { AxiosResponse } from "axios";

export const getGenreProfileId = async (
    profileId: string,
  ) => {
    try {
      const p = await axios.get<{}, AxiosResponse<GetTokenResponse>>(
        `${SOCIAL_ART_API_URL}/user/genre`,
        {
          params: {
            profileId,
          },
        }
      );
      return {
        data: p.data,
        message: '',
        error: false,
      };
    } catch (error) {
      return {
        data: null,
        error: true,
        message: error?.response?.data?.message,
      };
    }
  };