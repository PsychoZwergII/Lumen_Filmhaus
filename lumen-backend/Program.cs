var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(); // CORS aktivieren
builder.Services.AddControllers();

var app = builder.Build();

app.UseCors(policy => policy
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

app.UseAuthorization();
app.MapControllers();

app.Run();
