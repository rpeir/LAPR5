using System;
using System.Collections.Generic;
using System.Linq;
using GestaoTarefas.Domain.Shared;
using GestaoTarefas.Domain.TaskRequests;
using GestaoTarefas.Domain.Tasks;
using Microsoft.AspNetCore.Mvc;
using SYSTask = System.Threading.Tasks;

namespace GestaoTarefas.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TaskRequestsController : ControllerBase
{
  private readonly TaskRequestService _service;
  private readonly TaskService _taskService;

  public TaskRequestsController(TaskRequestService service, TaskService taskService)
  {
    _service = service;
    _taskService = taskService;
  }

  // GET: api/TaskRequests
  [HttpGet]
  public async SYSTask.Task<ActionResult<IEnumerable<TaskRequestDto>>> GetTaskRequests()
  {
    try
    {
      // GET: api/TaskRequests (all)
      if (Request.Query.Count == 0) return await _service.GetAllAsync();


      // GET: api/TaskRequests?status=xyz&userId=xyz
      if (Request.Query.ContainsKey("status") || Request.Query.ContainsKey("userId"))
      {
        return await this._service.GetByStatusUserAsync(
          statusDto: Request.Query["status"],
          userIdDto: Request.Query["userId"]
          );
      }

      // GET: api/TaskRequests?status=xyz&robotId=xyz,xyz,xyz&userId=xyz&startTime=time1&endTime=time2
      if (Request.Query.ContainsKey("status") || Request.Query.ContainsKey("robotId") || Request.Query.ContainsKey("userId") || Request.Query.ContainsKey("startTime") || Request.Query.ContainsKey("endTime"))
      {
        var resultNoRobot = await this._service.GetByStatusUserTimeAsync(
          statusDto: Request.Query["status"],
          userIdDto: Request.Query["userId"],
          startTimeDto: Request.Query["startTime"],
          endTimeDto: Request.Query["endTime"]
          );

        if (!Request.Query.ContainsKey("robotId")) return resultNoRobot;
        //split robots by comma
        List<string> robots = Request.Query["robotId"].ToString().Split(',').ToList();
        var tasksWithRobots = await this._taskService.GetByRobotsAsync(robots);

        var taskRequestsWithTasksAssigned = await this._service.GetByTasksAsync(tasksWithRobots);

        return await _service.FindRequestsWithAllFilters(resultNoRobot,taskRequestsWithTasksAssigned);
      }

      return StatusCode(400);

    } catch (ArgumentException e)
    {
      return StatusCode(400, e.Message);
    }

  }

  // GET: api/TaskRequests/5
  [HttpGet("{id}")]
  public async SYSTask.Task<ActionResult<TaskRequestDto>> GetById(Guid id)
  {
    var task = await _service.GetByIdAsync(new TaskRequestId(id));

    if (task == null)
    {
      return NotFound();
    }

    return task;
  }

  // POST: api/TaskRequests
  [HttpPost]
  public async SYSTask.Task<ActionResult<TaskRequestDto>> Create(CreatingTaskRequestDto dto)
  {
    try
    {
      var task = await _service.AddAsync(dto);

      return CreatedAtAction(nameof(GetById), new { id = task.Id }, task);
    }
    catch (BusinessRuleValidationException e)
    {
      return StatusCode(402, e.Message);
    }
    catch (IntegrityException e)
    {
      return StatusCode(409, e.Message);
    }

  }

  // DELETE: api/TaskRequests/5
  [HttpDelete("{id}")]
  public async SYSTask.Task<ActionResult<TaskRequestDto>> Reject(Guid id)
  {
    try
    {
      var task = await _service.RejectAsync(new TaskRequestId(id));
      if (task == null)
      {
        return NotFound();
      }
      return task;
    } catch (BusinessRuleValidationException e)
    {
      return StatusCode(402, e.Message);
    }
    catch (IntegrityException e)
    {
      return StatusCode(409, e.Message);
    }

  }

}
