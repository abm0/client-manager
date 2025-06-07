import { useState } from "react";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useLoadWeeklyTransactions } from "../../api/queries/transactions.query";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { format } from "date-fns";
import { ru } from 'date-fns/locale';

// Регистрируем нужные модули
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

type BarChartProps = {
  data: Record<string, number>[];
}

const BarChart = ({ data }: BarChartProps) => {
  const weeks = data.map(({ week }) => week);
  const sales = data.map(({ total }) => total);
  
  const chartData = {
    labels: weeks.map((key) => format(new Date(key), 'dd MMMM', { locale: ru })),
    datasets: [
      {
        label: 'Продажи',
        data: sales,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderRadius: 5,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: false,
      title: {
        display: false,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Сумма сделок (руб.)',
        }
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};

type WeeklyTransactionsProps = {
  clientId: number;
}

export const WeeklyTransactions = ({ clientId }: WeeklyTransactionsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data } = useLoadWeeklyTransactions(clientId);
  
  return (
    <div>
      <Button variant="link" color="blue" onClick={() => setIsOpen(true)}>График продаж</Button>
      
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size={"xl"}>
        <ModalOverlay />
        <ModalContent paddingBottom={4}>
          <ModalHeader>Статистика продаж за 30 дней по неделям</ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <BarChart data={data} />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}