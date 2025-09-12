import NeuralConnection from '../NeuralConnection';
import { mockPoems } from '@/data/mockPoems';

export default function NeuralConnectionExample() {
  return (
    <div className="w-full h-96 bg-background">
      <svg width="100%" height="100%" viewBox="0 0 600 400">
        <NeuralConnection
          from={mockPoems[0]}
          to={mockPoems[1]}
          isActive={true}
          opacity={0.6}
        />
      </svg>
    </div>
  );
}