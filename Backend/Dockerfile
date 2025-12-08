# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

# Copy solution and project files
COPY *.sln .
COPY NeoCircuitLab.Domain/*.csproj ./NeoCircuitLab.Domain/
COPY NeoCircuitLab.Application/*.csproj ./NeoCircuitLab.Application/
COPY NeoCircuitLab.Infrastructure/*.csproj ./NeoCircuitLab.Infrastructure/
COPY NeoCircuitLab.API/*.csproj ./NeoCircuitLab.API/

# Restore dependencies
RUN dotnet restore

# Copy all files
COPY . .

# Build and Publish
WORKDIR /app/NeoCircuitLab.API
RUN dotnet publish -c Release -o /app/publish

# Runtime Stage
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "NeoCircuitLab.API.dll"]
