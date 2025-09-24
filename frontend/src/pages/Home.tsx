import { useQuery } from "@tanstack/react-query"
import { apiRequest } from "../utils/apiRequest";
import { useEffect, useState } from "react";
import Select from 'react-select';
import { LineBarChart } from "../components/LineBarChart/LineBarChart";
import { LineChartGraph } from "../components/lineChartGraph/LineChart";
import { SimpleChart } from "../components/SimpleChart/SimpleChart";
/* import { useState } from "react"; */

type OptionsSelect = {
  value: number;
  label: string;
}

type OptionsPriceCoins = {
  price: number;
  fecha: string;
}
type OptionsPorcentageCoins = {
  percentage_change: number;
  fecha: string;
}

type OptionsVolumeCoins = {
  volume: number;
  fecha: string;
}
export const Home = () => {

  const [selectOption, setSelectOption] = useState< OptionsSelect | null>(null);
  const [pricesCoins, setPricesCoins] = useState<OptionsPriceCoins[]>([]);
  const [percentageCoins, setPercentageCoins] = useState<OptionsPorcentageCoins[]>([]);
  const [volumeCoins, setVolumeCoins] = useState<OptionsVolumeCoins[]>([]);

  const { data: coins, isLoading, refetch } = useQuery({
      queryKey: ["tasks"],
      queryFn: () => apiRequest({
          url: `http://localhost:3000/api/coins`,
          method: 'GET',
      }),
  });

  const { data: coin_detail, isLoading: isLoadingCoinsDetails , refetch: reloadCoinsDetails } = useQuery({
      queryKey: ["tasks",selectOption?.value],
      queryFn: () => apiRequest({
          url: `http://localhost:3000/api/coins/details/${selectOption?.value}`,
          method: 'GET',
      }),
      enabled: !!selectOption?.value,
      refetchInterval: 5000,
      refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if(coins && coins.length > 0) setSelectOption(coins[0]);
  }, [coins]);


  useEffect(() => {
    if(coin_detail && coin_detail.length > 0) {
      const coinsDetails:OptionsPriceCoins[] = [];
      const percentage_changeDetails:OptionsPorcentageCoins[] = [];
      const volumeDetails: OptionsVolumeCoins[] = [];
      coin_detail.map( (el: any) => {
        const { price, percentage_change, volume, last_update: fecha } = el;
        const formatFecha = new Date(fecha).toLocaleString("es-CO", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })

        coinsDetails.push({
          price: Number(price),
          fecha: formatFecha
        })
        percentage_changeDetails.push({
          percentage_change: Number(percentage_change),
          fecha: formatFecha
        })
        volumeDetails.push({
          volume: Number(volume) / 1000000,
          fecha: formatFecha
        })
      });
      setPricesCoins(coinsDetails);
      setPercentageCoins(percentage_changeDetails);
      setVolumeCoins(volumeDetails);
    }
  }, [coin_detail]);

  


  return (
    <div className="max-w-[1200px] mx-auto px-4 flex flex-col gap-4">
      <h1 className="text-white m-2 text-center text-4xl">CryptoInvestment APP</h1>
      <Select
          options={coins}
          value={selectOption}
          onChange={setSelectOption}
          className="w-full text-[#eb3b5a]"
          placeholder={`Seleccione una cripto monea`}
          closeMenuOnSelect={false}
          isClearable
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#1f1b45] p-4 rounded-lg shadow-md">
          <h2 className="text-white mb-2">Precio</h2>
          <LineBarChart data={pricesCoins} />
        </div>

        <div className="bg-[#1f1b45] p-4 rounded-lg shadow-md">
          <h2 className="text-white mb-2">Volumen</h2>
          <LineChartGraph data={volumeCoins} />
        </div>

        <div className="bg-[#1f1b45] p-4 rounded-lg shadow-md md:col-span-2">
          <h2 className="text-white mb-2">Porcentaje</h2>
          <SimpleChart data={percentageCoins} />
        </div>
      </div>
    </div>
  )
}
