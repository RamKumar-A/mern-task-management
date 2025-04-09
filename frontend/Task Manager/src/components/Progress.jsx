function Progress({ progress, status }) {
  function getColor() {
    switch (status) {
      case 'In Progress':
        return 'text-cyan-500 bg-cyan-500 border border-cyan-500/10';
      case 'Completed':
        return 'text-indigo-500 bg-indigo-500 border border-indigo-500/10';
      default:
        return 'text-violet-500 bg-violet-500 border border-violet-500/10';
    }
  }
  return (
    <div className="w-full  rounded-full h-1.5">
      <div
        className={` h-1.5 rounded-full text-center text-xs font-medium ${getColor()}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default Progress;
