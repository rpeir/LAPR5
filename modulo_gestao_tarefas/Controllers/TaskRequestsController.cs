using System;
using System.Collections.Generic;
using GestaoTarefas.Domain.Shared;
using GestaoTarefas.Domain.TaskRequests;
using Microsoft.AspNetCore.Mvc;
using SYSTask = System.Threading.Tasks;

namespace GestaoTarefas.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TaskRequestsController : ControllerBase
{
  private readonly TaskRequestService _service;

  public TaskRequestsController(TaskRequestService service)
  {
    _service = service;
  }

  // GET: api/TaskRequests
  [HttpGet]
  public async SYSTask.Task<ActionResult<IEnumerable<TaskRequestDto>>> GetAll()
  {
    return await _service.GetAllAsync();
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
}
