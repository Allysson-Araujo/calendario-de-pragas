
import CalendarioPragas from "@/components/CalendarioPragas";
import IconEditor from "@/components/IconEditor";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [showEditor, setShowEditor] = useState(false);
  
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-[#006E41]">Controle de Pragas</h1>
          <Button 
            onClick={() => setShowEditor(!showEditor)}
            variant="outline"
          >
            {showEditor ? "Esconder Editor" : "Mostrar Editor de Ícones"}
          </Button>
        </div>
        
        {showEditor && <IconEditor />}
        
        <CalendarioPragas />
      </div>
    </div>
  );
};

export default Index;
