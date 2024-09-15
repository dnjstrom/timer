import { Popconfirm } from 'antd';

export default function ClearButton({ onClick }: { onClick: () => void }) {
  return (
    <Popconfirm
      title="Rensa fält?"
      onConfirm={onClick}
      icon={false}
      okText="Rensa"
      cancelText="Avbryt"
      okButtonProps={
        {
          // danger: true,
        }
      }
    >
      <button type="button" className="bg-[rgb(250,20,50)] text-white px-4 py-2 rounded">
        Rensa
      </button>
    </Popconfirm>
  );
}
