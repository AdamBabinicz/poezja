import NeuralNode from '../NeuralNode';
import { mockPoems } from '@/data/mockPoems';

export default function NeuralNodeExample() {
  const handleClick = () => console.log('Neural node clicked');
  const handleHover = (poem: any) => console.log('Node hovered:', poem?.title);

  return (
    <div className="w-full h-96 bg-background">
      <svg width="100%" height="100%" viewBox="0 0 600 400">
        <NeuralNode
          poem={mockPoems[0]}
          onClick={handleClick}
          onHover={handleHover}
          isHighlighted={false}
          scale={1}
        />
      </svg>
    </div>
  );
}