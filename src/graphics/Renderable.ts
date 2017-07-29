/**
 * Represents a renderable which can be rendered onto the screen.
 */
import RenderInstruction from './RenderInstruction';
interface Renderable {
  renderInstruction: RenderInstruction | null;
  updateRenderInstruction: null | (() => void);
  isDeleted: boolean;
  delete(): void;
}
export default Renderable;