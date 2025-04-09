import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import moment from 'moment';
import AvatarGroup from '../../components/AvatarGroup';
import { LuSquareArrowOutUpRight } from 'react-icons/lu';

function ViewTaskDetails() {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  function getStatusTagColor(status) {
    switch (status) {
      case 'In Progress':
        return 'text-cyan-500 bg-cyan-50 border border-cyan-500/10';
      case 'Completed':
        return 'text-lime-500 bg-lime-50 border border-lime-500/10';

      default:
        return 'text-violet-500 bg-violet-50 border border-violet-500/10';
    }
  }

  // get Task info by ID
  async function getTaskDetailsByID() {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(id)
      );
      if (response.data) {
        const taskInfo = response.data;
        setTask(taskInfo);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  }

  // Handle todo check
  async function updateTodoChecklist(index) {
    const todoChecklist = [...task.todoChecklist];
    const taskId = id;
    if (todoChecklist && todoChecklist[index]) {
      todoChecklist[index].completed = !todoChecklist[index].completed;
      try {
        const response = await axiosInstance.put(
          API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(taskId),
          { todoChecklist }
        );
        if (response.status === 200) {
          setTask(response.data?.task || task);
        } else {
          // Optionally revert the toggle id the API call fails.
          todoChecklist[index].completed = !todoChecklist[index].completed;
        }
      } catch (err) {
        todoChecklist[index].completed = !todoChecklist[index].completed;
        console.error('Error while updating todo', err);
      }
    }
  }

  // Handle attachment link click
  function handleLinkClick(link) {
    if (!/^https?:\/\//i.test(link)) {
      link = 'https://' + link; // Default to HTTPS
    }
    window.open(link, '_blank');
  }

  useEffect(() => {
    if (id) {
      getTaskDetailsByID();
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <DashboardLayout activeMenu="My Tasks">
      <div className="mt-5">
        {task && (
          <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
            <div className="form-card col-span-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base md:text-xl font-medium">
                  {task?.title}
                </h2>
                <div
                  className={`text-[11px] font-medium md:text-[13px] ${getStatusTagColor(
                    task?.status
                  )} px-4 py-0.5 rounded `}
                >
                  {task?.status}
                </div>
              </div>

              <div className="mt-4">
                <InfoBox label="Decription" value={task?.description} />
              </div>

              <div className="grid grid-cols-12 gap-4 mt-4">
                <div className="col-span-6 md:col-span-4">
                  <InfoBox label="Priority" value={task?.priority} />
                </div>
                <div className="col-span-6 md:col-span-4">
                  <InfoBox
                    label="Due Date"
                    value={
                      task?.dueDate
                        ? moment(task?.dueDate).format('Do MMM YYYY')
                        : 'N?A'
                    }
                  />
                </div>
                <div className="col-span-6 md:col-span-4">
                  <label className="text-xs font-medium text-slate-500">
                    Assigned To
                  </label>
                  <AvatarGroup
                    avatars={
                      task?.assignedTo?.map((item) => item?.profileImageUrl) ||
                      []
                    }
                    maxVisible={5}
                  />
                </div>
              </div>

              <div className="mt-2">
                <label
                  htmlFor=""
                  className="text-xs font-medium text-slate-500"
                >
                  Todo Checklist
                </label>
                {task?.todoChecklist?.map((item, i) => (
                  <TodoChecklist
                    key={`todo_${i}`}
                    text={item?.text}
                    isChecked={item?.completed}
                    onChange={() => updateTodoChecklist(i)}
                  />
                ))}
              </div>
              {task?.attachments?.length > 0 && (
                <div className="mt-2">
                  <label
                    htmlFor=""
                    className="text-xs font-medium text-slate-500"
                  >
                    Attachments
                  </label>
                  {task?.attachments?.map((link, i) => (
                    <Attachments
                      key={`link_${i}`}
                      link={link}
                      index={i}
                      onClick={() => handleLinkClick(link)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

function InfoBox({ label, value }) {
  return (
    <>
      <label className="text-xs font-medium text-slate-500">{label}</label>
      <p className="text-[12px] md:text-[13px] font-medium text-gray-700 mt-0.5 ">
        {value}
      </p>
    </>
  );
}

function TodoChecklist({ text, isChecked, onChange }) {
  return (
    <div className="flex items-center gap-3 p-3">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className="w-4 h-4 text-primary bg-gray-100 border border-gray-300 rounded-sm outline-none cursor-pointer"
      />
      <p className="text-[13px] text-gray-800">{text}</p>
    </div>
  );
}

function Attachments({ link, index, onClick }) {
  return (
    <div
      className="mt-2 mb-3 px-3 py-2 rounded-md cursor-pointer border border-gray-100 bg-gray-50 flex justify-between "
      onClick={onClick}
    >
      <div className="flex-1 flex items-center gap-3">
        <span className="text-xs text-gray-400 font-semibold mr-2">
          {index < 9 ? `0${index + 1}` : index + 1}
        </span>
        <p className="text-xs text-black">{link}</p>
      </div>
      <LuSquareArrowOutUpRight className="text-gray-400" />
    </div>
  );
}

export default ViewTaskDetails;
