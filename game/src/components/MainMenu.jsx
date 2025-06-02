const buttons = ["PLAY", "SETTINGS", "QUIT"];

const MainMenu = ({ onSubmit }) => {
  return (
    <div className="bg-slate-950 w-full min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-8xl text-white font-bold p-8 space-y-6">TITLE</h1>

      {buttons.map((name) => {
        return (
          <div
            className="hover:bg-gradient-to-l from-transparent via-[#ffc400] w-150 to-transparent mb-4 py-0.5"
            key={name}
          >
            <button
              className="text-white bg-slate-950 text-shadow-lg w-full text-2xl hover:bg-gradient-to-r from-transparent py-1 via-gold/50 to-transparent"
              onClick={name === "PLAY" ? onSubmit : undefined}
            >
              {name}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default MainMenu;
