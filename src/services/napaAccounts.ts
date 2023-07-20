import axios, { AxiosResponse } from 'axios';
import { API_URL } from '../constants/url';

export const getNapaAccounts = async (profileId: string) => {
  try {
    const p = await axios.get<{}, AxiosResponse<{}>>(`${API_URL}/napaccounts`, {
      params: {
        profileId,
      },
    });
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

export const addNapaAccount = async (profileId: string, name: string, index: number) => {
  try {
    const p = await axios.get<{}, AxiosResponse<{}>>(`${API_URL}/napaccounts/new`, {
      params: {
        profileId,
        name,
        index
      },
    });
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

export const importNapaAccount = async (profileId: string, name: string, privateKey: string) => {
  try {
    const p = await axios.get<{}, AxiosResponse<{}>>(`${API_URL}/napaccounts/import/new`, {
      params: {
        profileId,
        name,
        privateKey
      },
    });
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


export const switchNapaAccount = async (profileId: string, accountId: string) => {
  try {
    const p = await axios.get<{}, AxiosResponse<{}>>(`${API_URL}/napaccounts/switch`, {
      params: {
        profileId,
        accountId
      },
    });
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

export const deleteNapaAccount = async (profileId: string, accountId: string) => {
  try {
    const p = await axios.post<{}, AxiosResponse<{}>>(`${API_URL}/deleteNapaAccount?profileId=${profileId}&accountId=${accountId}`);
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