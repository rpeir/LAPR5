using System.Threading.Tasks;

namespace GestaoTarefas.Domain.Shared
{
    public interface IUnitOfWork
    {
        Task<int> CommitAsync();
    }
}
