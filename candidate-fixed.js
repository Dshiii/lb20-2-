/* Сборка поставщика. Сначала чёрный ящик, затем инспекция и исправление.
   Это не правильные требования: сопоставляйте с ТРЕБОВАНИЯ.txt.
   После редактирования сохраните файл и обновите START.html. */
(function(root){
const candidate={
  // БЫЛО: pumpStart: humidity => humidity <= 35,
  // СТАЛО: строгое неравенство, чтобы при 35 насос не включался (R05)
  pumpStart: humidity => humidity < 35, 
  
  // БЫЛО: hold: (previous, input) => previous.fault && !input.reset && input.age > 30,
  // СТАЛО: убрано условие age > 30, чтобы авария удерживалась всегда до reset (R03)
  hold: (previous, input) => previous.fault && !input.reset, 
  
  // БЫЛО: order: () => ['pump', 'vent']
  // СТАЛО: вентиляция имеет приоритет перед насосом при распределении бюджета (R09)
  order: () => ['vent', 'pump'] 
};
if(typeof module!=='undefined')module.exports=candidate;else root.CandidatePolicy=candidate;
})(typeof window!=='undefined'?window:globalThis);
