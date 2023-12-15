using System.Threading.Tasks;
using GestaoTarefas.Domain.Shared;

namespace GestaoTarefas.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly GestaoTarefasDbContext _context;

        public UnitOfWork(GestaoTarefasDbContext context)
        {
            this._context = context;
        }

        public async Task<int> CommitAsync()
        {
            return await this._context.SaveChangesAsync();
        }
    }
}
