// mockSocket.js
export function createMockSocket() {
  const listeners = {};
  let timer = null;
  const sampleNames = ["Ayesha", "Omar", "Sara", "Ali", "Zainab", "Bushra", "Hassan"];
  const sampleMsgs = [
    "Great training today!",
    "Need quieter meeting rooms.",
    "Loved the coffee in pantry.",
    "Please update the printer drivers.",
    "Happy with team collaboration this week.",
    "Can we have more flexible hours?",
    "AC is a bit cold in Block B."
  ];

  function emit(event, payload) {
    (listeners[event] || []).forEach((cb) => cb(payload));
  }

  // initial dataset (most recent first)
  const initial = Array.from({ length: 8 }).map((_, i) => ({
    id: `init-${i}`,
    name: sampleNames[i % sampleNames.length],
    rating: Math.ceil(Math.random() * 5) + 5, // 6..10
    message: sampleMsgs[i % sampleMsgs.length],
    department: ["HR","Engineering","Design","Ops"][i % 4],
    createdAt: new Date(Date.now() - i * 1000 * 60 * 30).toISOString()
  }));

  // start emitting
  function start() {
    emit("connect");
    timer = setInterval(() => {
      const fb = {
        id: `s-${Date.now()}`,
        name: sampleNames[Math.floor(Math.random() * sampleNames.length)],
        rating: Math.ceil(Math.random() * 10),
        message: sampleMsgs[Math.floor(Math.random() * sampleMsgs.length)],
        department: ["HR","Engineering","Design","Ops"][Math.floor(Math.random()*4)],
        createdAt: new Date().toISOString()
      };
      emit("newFeedback", fb);
    }, 6000 + Math.random() * 6000);
  }

  start();

  return {
    on: (ev, cb) => {
      listeners[ev] = listeners[ev] || [];
      listeners[ev].push(cb);
    },
    off: (ev, cb) => {
      listeners[ev] = (listeners[ev] || []).filter((f) => f !== cb);
    },
    getInitial: () => initial,
    close: () => {
      clearInterval(timer);
      emit("disconnect");
    }
  };
}
