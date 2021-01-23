using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace normalizrTestProject.DbModels
{
    public partial class TestdbContext : DbContext
    {
        public TestdbContext()
        {
        }

        public TestdbContext(DbContextOptions<TestdbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Address> Addresses { get; set; }
        public virtual DbSet<Contact> Contacts { get; set; }
        public virtual DbSet<Dog> Dogs { get; set; }
        public virtual DbSet<Person> People { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=localhost;Database=Testdb;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Address>(entity =>
            {
                entity.ToTable("address");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.Addrline1)
                    .HasMaxLength(200)
                    .HasColumnName("addrline1");

                entity.Property(e => e.Addrline2)
                    .HasMaxLength(200)
                    .HasColumnName("addrline2");

                entity.Property(e => e.Dogid).HasColumnName("dogid");

                entity.Property(e => e.Personid).HasColumnName("personid");

                entity.HasOne(d => d.Dog)
                    .WithMany(p => p.Addresses)
                    .HasForeignKey(d => d.Dogid)
                    .HasConstraintName("FK__address__dogid__3A81B327");

                entity.HasOne(d => d.Person)
                    .WithMany(p => p.Addresses)
                    .HasForeignKey(d => d.Personid)
                    .HasConstraintName("FK__address__personi__398D8EEE");
            });

            modelBuilder.Entity<Contact>(entity =>
            {
                entity.ToTable("contact");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .HasColumnName("email");

                entity.Property(e => e.Phonenumber)
                    .HasMaxLength(100)
                    .HasColumnName("phonenumber");
            });

            modelBuilder.Entity<Dog>(entity =>
            {
                entity.ToTable("dog");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.Dogname)
                    .HasMaxLength(100)
                    .HasColumnName("dogname");

                entity.Property(e => e.Ownerpersonid).HasColumnName("ownerpersonid");

                entity.HasOne(d => d.Ownerperson)
                    .WithMany(p => p.Dogs)
                    .HasForeignKey(d => d.Ownerpersonid)
                    .HasConstraintName("FK__dog__ownerperson__35BCFE0A");
            });

            modelBuilder.Entity<Person>(entity =>
            {
                entity.ToTable("person");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.Firstname)
                    .HasMaxLength(10)
                    .HasColumnName("firstname");

                entity.Property(e => e.Lastname)
                    .HasMaxLength(10)
                    .HasColumnName("lastname");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
