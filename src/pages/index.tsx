import { ReactNode, useState } from 'react';
import ButtonRow from '../components/ButtonRow';
import clsx from 'clsx';
import { ConfigProvider, Dropdown } from 'antd';

function Page({ id }: { id: number }) {
  return (
    <div className="flex flex-col gap-4 divide-y">
      <ButtonRow id={`larm-${id}`} title="Larm"></ButtonRow>
      <ButtonRow id={`departure-${id}`} title="Avgång hamn"></ButtonRow>
      <ButtonRow id={`arrival-${id}`} title="Framme objekt"></ButtonRow>
      <ButtonRow id={`finished-${id}`} title="Klar objekt"></ButtonRow>
      <ButtonRow id={`return-${id}`} title="Åter hamn"></ButtonRow>
    </div>
  );
}

function Tab({
  onClick,
  children,
  active,
}: {
  children: ReactNode;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <button
      className={clsx('bg-slate-100 px-4 py-2 h-20', active && 'text-white !bg-[rgb(0,140,180)]')}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: 'rgb(250, 20, 50)',
        },
      }}
    >
      <div className="pb-20">
        <div className="sticky top-0 flex justify-between p-6 text-white bg-[rgb(0,140,180)]">
          <h1 className="text-3xl font-bold">Uppdrag {currentPage + 1}</h1>
          <Dropdown
            menu={{
              items: [
                {
                  key: 'clear-all',
                  onClick: () => {
                    localStorage.clear();
                    location.reload();
                  },
                  label: 'Rensa alla uppdrag',
                  danger: true,
                },
              ],
            }}
            placement="bottomRight"
          >
            <button className="text-3xl px-4 -mr-4">⋮</button>
          </Dropdown>
        </div>
        <div>
          {currentPage === 0 && <Page id={0}></Page>}
          {currentPage === 1 && <Page id={1}></Page>}
          {currentPage === 2 && <Page id={2}></Page>}
          {currentPage === 3 && <Page id={3}></Page>}
          {currentPage === 4 && <Page id={4}></Page>}
        </div>
        <div className="fixed left-0 right-0 bottom-0 grid grid-cols-5">
          <Tab
            active={currentPage === 0}
            onClick={() => {
              setCurrentPage(0);
            }}
          >
            1
          </Tab>
          <Tab
            active={currentPage === 1}
            onClick={() => {
              setCurrentPage(1);
            }}
          >
            2
          </Tab>
          <Tab
            active={currentPage === 2}
            onClick={() => {
              setCurrentPage(2);
            }}
          >
            3
          </Tab>
          <Tab
            active={currentPage === 3}
            onClick={() => {
              setCurrentPage(3);
            }}
          >
            4
          </Tab>
          <Tab
            active={currentPage === 4}
            onClick={() => {
              setCurrentPage(4);
            }}
          >
            5
          </Tab>
        </div>
      </div>
    </ConfigProvider>
  );
}
