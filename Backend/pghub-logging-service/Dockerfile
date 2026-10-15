FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY PgHub.LoggingService.csproj ./
RUN dotnet restore PgHub.LoggingService.csproj

COPY . ./
RUN dotnet publish PgHub.LoggingService.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app

COPY --from=build /app/publish .
EXPOSE 8080

ENTRYPOINT ["dotnet", "PgHub.LoggingService.dll"]