import React from 'react';

function Edit() {
    return (
    <>
    </>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#00000077] bg-opacity-50 z-99999">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            {/* Modal header */}
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="text-xl font-semibold">Buyurtmangiz</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✖
              </button>
            </div>

            {/* Modal body */}
        

            {/* Modal footer */}
            <div className="mt-4 flex justify-end gap-3">
              <h3
                onClick={() => setIsOpen(false)}
                className="text-gray-600 hover:bg-gray-200 px-4 py-2 rounded-lg"
              >
               Yana buyurtma berish
              </h3>
              <h3 className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Mofaqiyatli zakaz berildi
              </h3>
            </div>
          </div>
        </div>
      )}
        </div>
    );
}

export default Edit;