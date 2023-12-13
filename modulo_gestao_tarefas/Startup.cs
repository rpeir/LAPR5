using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using GestaoTarefas.Infrastructure;
using GestaoTarefas.Infrastructure.Shared;
using GestaoTarefas.Domain.Shared;
using GestaoTarefas.Domain.Tasks;
using GestaoTarefas.Infrastructure.Tasks;
using GestaoTarefas.Domain.Tasks;


namespace GestaoTarefas
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
           services.AddDbContext<GestaoTarefasDbContext>(opt =>
            opt.UseSqlServer(Configuration.GetConnectionString("SqlServerCS"))
              .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());
          //services.AddDbContext<GestaoTarefasDbContext>(opt =>
          //  opt.UseInMemoryDatabase("GestaoTarefasDB")
          //    .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());

          ConfigureMyServices(services);

          services.AddControllers().AddNewtonsoftJson();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }


            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        public void ConfigureMyServices(IServiceCollection services)
        {
            services.AddTransient<IUnitOfWork,UnitOfWork>();

            services.AddTransient<ISurveillanceTaskRepository, SurveillanceTaskRepository>();
            services.AddTransient<IDeliveryTaskRepository, DeliveryTaskRepository>();
            services.AddTransient<ITaskRepository, TaskRepository>();

            services.AddTransient<TaskService>();

            services.AddTransient<ITaskMapper<Task, TaskDto>, TaskMapper>();
        }
    }
}
