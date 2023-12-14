using System;
using System.Collections.Generic;
using GestaoTarefas.Domain.Shared;
using GestaoTarefas.Domain.Tasks;
using Microsoft.AspNetCore.Mvc;
using SYSTask = System.Threading.Tasks;

namespace GestaoTarefas.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TasksController : ControllerBase
{
  private readonly TaskService _service;

  public TasksController(TaskService service)
  {
    _service = service;
  }

  // GET: api/Tasks
  [HttpGet]
  public async SYSTask.Task<ActionResult<IEnumerable<TaskDto>>> GetAll()
  {
    return await _service.GetAllAsync();
  }

  // GET: api/Tasks/5
  [HttpGet("{id}")]
  public async SYSTask.Task<ActionResult<TaskDto>> GetById(Guid id)
  {
    var task = await _service.GetByIdAsync(new TaskId(id));

    if (task == null)
    {
      return NotFound();
    }

    return task;
  }

  // POST: api/Tasks
  [HttpPost]
  public async SYSTask.Task<ActionResult<TaskDto>> Create(CreatingTaskDto dto)
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
}
