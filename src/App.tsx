import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useState } from "react";
import "./App.css";
import { initialImageData } from "./data";
import { ImageGallery } from "./types/global.types";

function App() {
 const [galleryData, setGalleryData] = useState(initialImageData);
  const [activeItem, setActiveItem] = useState<ImageGallery | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor)
  );

  const handleDragStart = (event:DragStartEvent) => {
    const {id}= event.active;
    if(!id) return;

    // current item
    const currentItem= galleryData.find((item)=> item.id===id)

    setActiveItem(currentItem || null)
  };
  const handleDragEnd = (event:DragEndEvent) => {
    setActiveItem(null);
    const {active,over}= event
    if(!over) return;

    if(active.id===over.id){
      setGalleryData((items)=>{
        const oldIndex= items.findIndex((item)=>item.id===active.id);
        const newIndex= items.findIndex((item)=>item.id===over.id);
        return arrayMove(items,oldIndex,newIndex);
      })
    }
  };

  return (
    <div className=" min-h-screen">
      <div className="container flex flex-col items-center">
        <div className="bg-white my-8 rounded-lg shadow max-w-5xl grid divide-y">
          <header className="text-2xl">ShowCase</header>

          {/* dnd context */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div>Image Gallery</div>
          </DndContext>
        </div>
      </div>
    </div>
  );
}

export default App;
