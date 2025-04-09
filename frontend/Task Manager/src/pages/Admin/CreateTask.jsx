/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useEffect, useState } from 'react';
import { LuTrash2 } from 'react-icons/lu';
import { PRIORITY_DATA } from '../../utils/data';
import SelectDropdown from '../../components/inputs/SelectDropdown';
import SelectUsers from '../../components/inputs/SelectUsers';
import TodoListInput from '../../components/inputs/TodoListInput';
import AddAttachmentsInput from '../../components/inputs/AddAttachmentsInput';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import toast from 'react-hot-toast';
import moment from 'moment';
import Modal from '../../components/Modal';
import DeleteAlert from '../../components/DeleteAlert';

function CreateTask() {
  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    priority: '',
    dueDate: null,
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  });

  const [currentTask, setCurrentTask] = useState(null);
  const [error, setError] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  function handleValueChange(key, value) {
    setTaskData((prevData) => ({ ...prevData, [key]: value }));
  }

  function clearData() {
    setTaskData({
      title: '',
      description: '',
      priority: 'Low',
      dueDate: null,
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    });
  }

  // Create Task
  async function createTask() {
    setLoading(true);

    try {
      const todolist = taskData.todoChecklist?.map((item) => ({
        text: item,
        completed: false,
      }));
      const response = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklist: todolist,
      });
      toast.success(response.data.message);

      clearData();
    } catch (err) {
      console.error('Error creating task:', err);
    } finally {
      setLoading(false);
    }
  }

  // Update Task
  async function updateTask() {
    setLoading(true);
    try {
      const todolist = taskData.todoChecklist?.map((item) => {
        const prevTodoChecklist = currentTask?.todoChecklist || [];
        const matchedTask = prevTodoChecklist.find(
          (task) => task.text === item
        );
        return {
          text: item,
          completed: matchedTask ? matchedTask.completed : false,
        };
      });

      const response = await axiosInstance.put(
        API_PATHS.TASKS.UPDATE_TASK(taskId),
        {
          ...taskData,
          dueDate: new Date(taskData.dueDate).toISOString(),
          todoChecklist: todolist,
        }
      );

      toast.success(response.data.message);
    } catch (err) {
      console.error('Error creating task:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit() {
    setError(null);

    // Input validation
    if (!taskData.title.trim()) {
      setError('Title is required.');
      return;
    }
    if (!taskData.description.trim()) {
      setError('Description is required.');
      return;
    }
    if (!taskData.dueDate) {
      setError('Due Date is required.');
      return;
    }
    if (!taskData.assignedTo.length === 0) {
      setError('Add atleast one todo task.');
      return;
    }
    if (taskData.todoChecklist?.length === 0) {
      setError('Add atleast one todo tasks');
    }
    if (taskId) {
      updateTask();
      return;
    }
    createTask();
  }

  // Get Task info by ID
  async function getTaskDetailsByID() {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(taskId)
      );

      if (response.data) {
        const taskInfo = response.data;
        setCurrentTask(taskInfo);

        setTaskData(() => ({
          title: taskInfo.title,
          description: taskInfo.description,
          priority: taskInfo.priority,
          dueDate: taskInfo.dueDate
            ? moment(taskInfo.dueDate).format('YYYY-MM-DD')
            : null,
          assignedTo: taskInfo?.assignedTo?.map((item) => item?._id) || [],
          todoChecklist:
            taskInfo.todoChecklist?.map((item) => item?.text) || [],
          attachments: taskInfo.attachments || [],
        }));
      }
    } catch (err) {
      console.error('Error fetching users', err);
    }
  }

  // Delete Task
  async function deleteTask() {
    try {
      await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId));
      setOpenDeleteAlert(false);
      toast.success('Task deleted successfully');
      navigate('/admin/tasks');
    } catch (err) {
      console.error(
        'Error deleting task',
        err.response?.data?.message || err.message
      );
    }
  }

  useEffect(() => {
    if (taskId) {
      getTaskDetailsByID(taskId);
    }
    return () => {};
  }, [taskId]);

  return (
    <DashboardLayout activeMenu="Create Task">
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="form-card col-span-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-xl font-medium">
                {taskId ? 'Update Task' : 'Create Task'}
              </h2>
              {taskId && (
                <button
                  className="flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-1 border border-rose-100 hover:border-rose-300 cursor-pointer"
                  onClick={() => setOpenDeleteAlert(true)}
                >
                  <LuTrash2 className="text-base" /> Delete
                </button>
              )}
            </div>
            <div className="mt-4">
              <label
                htmlFor="title"
                className="text-xs font-medium text-slate-600
              "
              >
                Task Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Create App UI"
                className="form-input"
                value={taskData.title}
                onChange={(e) => handleValueChange('title', e.target.value)}
              />
            </div>
            <div className="mt-3">
              <label
                htmlFor="description"
                className="text-xs font-medium text-slate-600"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                placeholder="Describe task"
                className="form-input"
                rows={4}
                value={taskData.description}
                onChange={(e) =>
                  handleValueChange('description', e.target.value)
                }
              />
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Priority
                </label>
                <SelectDropdown
                  options={PRIORITY_DATA}
                  value={taskData.priority}
                  onChange={(value) => handleValueChange('priority', value)}
                  placeholder="Select Priority"
                />
              </div>
            </div>
            <div className="col-span-6 md:col-span-4">
              <label
                htmlFor="dueDate"
                className="text-xs font-medium text-slate-600"
              >
                Due Date
              </label>
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                placeholder="Create App UI"
                className="form-input"
                value={taskData.dueDate}
                onChange={(e) => handleValueChange('dueDate', e.target.value)}
              />
            </div>
            <div className="col-span-12 md:col-span-3 ">
              <label className="text-xs font-medium text-slate-600">
                Assigned To
              </label>
              <SelectUsers
                selectedUsers={taskData.assignedTo}
                setSelectedUsers={(value) =>
                  handleValueChange('assignedTo', value)
                }
              />
            </div>
            <div className="mt-3">
              <label htmlFor="" className="text-xs font-medium text-slate-600">
                TODO CHECKLIST
              </label>
              <TodoListInput
                todoList={taskData.todoChecklist}
                setTodoList={(value) =>
                  handleValueChange('todoChecklist', value)
                }
              />
            </div>
            <div className="mt-3">
              <label htmlFor="" className="text-xs font-medium text-slate-600">
                Add Attachment
              </label>
              <AddAttachmentsInput
                attachments={taskData.attachments}
                setAttachments={(value) =>
                  handleValueChange('attachments', value)
                }
              />
            </div>

            {error && (
              <p className="text-xs font-medium text-red-500 mt-5">{error}</p>
            )}
            <div className="flex justify-end">
              <button
                className="add-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {taskId ? 'UPDATE TASK' : 'CREATE TASK'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        title="Delete Task"
      >
        <DeleteAlert
          content="Are you sure you want to delete this task?"
          onDelete={() => deleteTask()}
        />
      </Modal>
    </DashboardLayout>
  );
}

export default CreateTask;
