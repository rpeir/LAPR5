using System.Collections.Generic;
using System.Linq;
using GestaoTarefas.Domain.Tasks;

namespace GestaoTarefas.Domain.TaskRequests;

public interface ITaskRequestMapper<T, TDto> where T : TaskRequest where TDto : TaskRequestDto
{
    public TDto ToDto(T task);

    public IEnumerable<TDto> ToDtoList(IEnumerable<T> tasks)
    {
      return tasks.Select(ToDto);
    }

    public T ToEntity(CreatingTaskRequestDto dto);

    public IEnumerable<T> ToEntityList(IEnumerable<CreatingTaskRequestDto> taskDtos)
    {
      return taskDtos.Select(ToEntity);
    }

}
