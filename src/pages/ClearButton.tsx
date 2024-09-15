import { Popconfirm } from 'antd';

export const ClearButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Popconfirm title="Reset" onConfirm={onClick} icon={false} okText="Clear">
      <button type="button" className="bg-red-500 text-white px-4 py-2 rounded">
        Clear
      </button>
    </Popconfirm>
  );
};
