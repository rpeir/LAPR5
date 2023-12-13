using System.Collections.Generic;
using System.Linq;

namespace GestaoTarefas.Domain.Tasks;

public interface ITaskMapper<T, TDto> where T : Task where TDto : TaskDto
{
    public TDto ToDto(T task);

    public IEnumerable<TDto> ToDtoList(IEnumerable<T> tasks)
    {
      return tasks.Select(ToDto);
    }

    public T ToEntity(CreatingTaskDto dto);

    public IEnumerable<T> ToEntityList(IEnumerable<CreatingTaskDto> taskDtos)
    {
      return taskDtos.Select(ToEntity);
    }

}
